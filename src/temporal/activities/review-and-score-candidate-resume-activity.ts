import { generateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { Logger } from '../../utils/logger';

const logger = new Logger('review-and-score-candidate-resume-activity');

export class ReviewAndScoreCandidateResumeActivity {
  private anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  async reviewAndScoreCandidateResume(resume: string): Promise<string> {
    logger.info('Starting resume review and scoring process');
    
    try {
      if (!resume || resume.trim().length === 0) {
        logger.error('Resume content is empty or invalid');
        throw new Error('Resume content is required for scoring');
      }

      const anthropicModel = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022';
      const model = this.anthropic(anthropicModel);

      const systemPrompt = `You are an expert HR recruitment specialist and resume evaluation agent with extensive experience in candidate assessment and talent acquisition. Your role is to analyze candidate resumes and provide objective, data-driven scoring based on qualifications, experience, and job fit.

Your expertise includes:
- Comprehensive resume analysis and candidate evaluation
- Skills assessment and experience matching
- Industry knowledge across multiple sectors
- Objective scoring methodologies and bias mitigation
- Understanding of hiring best practices and compliance

When evaluating candidates, you must:
- Analyze the resume content thoroughly for relevant experience, skills, education, and achievements
- Provide a numerical score between 0 and 100 based on objective criteria
- Consider factors such as: relevant work experience, technical skills, educational background, career progression, achievements, and overall presentation
- Maintain objectivity and avoid bias based on personal characteristics
- Focus on job-relevant qualifications and competencies
- Provide clear, professional assessments

Your scoring should be:
- Consistent and standardized across all candidates
- Based on measurable criteria and evidence from the resume
- Justified by specific elements found in the candidate's background
- Aligned with industry standards for resume evaluation

Output your score as a single number between 0 and 100, where 0 represents completely unqualified and 100 represents an exceptional match with outstanding qualifications.`;

      const userPrompt = `Please evaluate and score the following candidate resume:

**Resume Content:**
${resume}

**Evaluation Instructions:**
1. Analyze the resume content for relevant qualifications, experience, and skills
2. Assess the candidate's background against typical job requirements and industry standards
3. Consider factors including:
   - Relevant work experience and career progression
   - Technical skills and competencies
   - Educational background and certifications
   - Professional achievements and accomplishments
   - Resume quality and presentation

**Scoring Criteria:**
- 90-100: Exceptional candidate with outstanding qualifications
- 80-89: Strong candidate with excellent qualifications
- 70-79: Good candidate with solid qualifications
- 60-69: Adequate candidate with basic qualifications
- 50-59: Below average candidate with limited qualifications
- 0-49: Poor candidate with insufficient qualifications

**Required Output:**
Provide only the numerical score (0-100) as your response. Do not include explanations, justifications, or additional text - only the score number.`;

      logger.info('Sending resume to AI agent for scoring');

      const result = await generateText({
        model: model,
        system: systemPrompt,
        prompt: userPrompt,
        temperature: 0.7
      });

      const score = result.text.trim();
      
      // Validate that the response is a valid score
      const numericScore = parseInt(score, 10);
      if (isNaN(numericScore) || numericScore < 0 || numericScore > 100) {
        logger.error(`Invalid score received from AI: ${score}`);
        throw new Error(`Invalid score format received: ${score}`);
      }

      logger.info(`Resume scored successfully: ${score}`);
      return score;

    } catch (error) {
      logger.error('Error scoring resume:', error);
      throw error;
    }
  }
}