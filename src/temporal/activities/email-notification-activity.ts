import { Logger } from '../../utils/logger';
import { SendGridClient } from '../../services/email/sendgrid-client';
import { FoundryServiceFactory } from '../../services/foundry/foundry-service-factory';
import { CandidateService } from '../../services/foundry/candidate-service';

const logger = new Logger('email-notification-activity');

export interface SendEmailParams {
  to_email: string;
  from_email?: string;
  from_name?: string;
  subject: string;
  html_content: string;
  headers?: Record<string, string>;
  workflow_id?: string;
}

export class EmailNotificationActivity {
  private emailClient: SendGridClient;
  private candidateService: CandidateService | null = null;

  constructor() {
    this.emailClient = new SendGridClient();
  }

  private async getCandidateService(): Promise<CandidateService> {
    if (!this.candidateService) {
      this.candidateService = await FoundryServiceFactory.createCandidateService();
    }
    return this.candidateService;
  }

  async sendNotificationEmail(score: string, candidateId: string): Promise<void> {
    logger.info(`Sending notification email for candidate ${candidateId} with score ${score}`);
    
    try {
      // Fetch candidate information from Foundry
      const service = await this.getCandidateService();
      const candidate = await service.fetchCandidate(candidateId);

      if (!candidate) {
        logger.error(`Candidate not found: ${candidateId}`);
        throw new Error(`Candidate not found: ${candidateId}`);
      }

      if (!candidate.email) {
        logger.error(`No email found for candidate ${candidateId}`);
        throw new Error(`No email found for candidate ${candidateId}`);
      }

      const scoreValue = parseFloat(score);
      if (isNaN(scoreValue)) {
        logger.error(`Invalid score format: ${score}`);
        throw new Error(`Invalid score format: ${score}`);
      }

      // Determine email type based on score
      let emailParams: SendEmailParams;
      
      if (scoreValue > 80) {
        emailParams = this.createCongratulationEmail(candidate.email, candidate.name, scoreValue);
        logger.info(`Sending congratulation email to ${candidate.email}`);
      } else {
        emailParams = this.createRejectionEmail(candidate.email, candidate.name);
        logger.info(`Sending rejection email to ${candidate.email}`);
      }

      // Add workflow metadata
      emailParams.workflow_id = candidateId;
      emailParams.headers = {
        ...emailParams.headers,
        'X-Workflow-Step': 'Email Notification',
        'X-Activity-Type': 'candidate-notification',
        'X-Candidate-Id': candidateId,
        'X-Score': score
      };

      // Send the email
      const result = await this.emailClient.sendEmail(emailParams);
      logger.info(`Email sent successfully to ${candidate.email} with status code: ${result.statusCode}`);
      
    } catch (error) {
      logger.error(`Failed to send notification email for candidate ${candidateId}:`, error);
      throw error;
    }
  }

  private createCongratulationEmail(email: string, name: string, score: number): SendEmailParams {
    const subject = 'Congratulations! Next Steps in Your Application';
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .score-badge { background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; font-weight: bold; margin: 10px 0; }
            .cta-button { background-color: #2196F3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Congratulations ${name}!</h1>
            </div>
            <div class="content">
              <p>We are excited to inform you that your application has received an excellent score!</p>
              
              <div style="text-align: center;">
                <div class="score-badge">Your Score: ${score}/100</div>
              </div>
              
              <p>Your qualifications and experience have impressed our team, and we would love to move forward with the next step in our hiring process.</p>
              
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Schedule a recruiter screening call</li>
                <li>Discuss your experience and career goals</li>
                <li>Learn more about the role and our company</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="https://calendly.com/recruiter-screen" class="cta-button">📅 Book Your Recruiter Screen</a>
              </div>
              
              <p>We look forward to speaking with you soon!</p>
              
              <p>Best regards,<br>
              The Recruiting Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return {
      to_email: email,
      subject: subject,
      html_content: htmlContent
    };
  }

  private createRejectionEmail(email: string, name: string): SendEmailParams {
    const subject = 'Thank You for Your Application';
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #607D8B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You ${name}</h1>
            </div>
            <div class="content">
              <p>Thank you for taking the time to apply for the position with our company. We truly appreciate your interest in joining our team.</p>
              
              <p>After careful consideration of your application and qualifications, we have decided to move forward with other candidates whose experience more closely aligns with our current needs.</p>
              
              <p>Please know that this decision was not made lightly. We were impressed by many aspects of your background, and we encourage you to apply for future opportunities that may be a better fit.</p>
              
              <p>We wish you the very best in your job search and future career endeavors. Thank you again for considering us as a potential employer.</p>
              
              <p>Warm regards,<br>
              The Recruiting Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    return {
      to_email: email,
      subject: subject,
      html_content: htmlContent
    };
  }
}