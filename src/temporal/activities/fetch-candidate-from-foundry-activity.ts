import { Logger } from '../../utils/logger';
import { FoundryServiceFactory } from '../../services/foundry/foundry-service-factory';
import { CandidateService } from '../../services/foundry/candidate-service';

const logger = new Logger('fetch-candidate-from-foundry-activity');

export class FetchCandidateFromFoundryActivity {
  private candidateService: CandidateService | null = null;

  private async getCandidateService(): Promise<CandidateService> {
    if (!this.candidateService) {
      this.candidateService = await FoundryServiceFactory.createCandidateService();
    }
    return this.candidateService;
  }

  async fetchCandidateFromFoundry(candidateId: string): Promise<string> {
    logger.info(`Fetching candidate resume from Foundry for candidateId: ${candidateId}`);
    
    try {
      const service = await this.getCandidateService();
      const candidate = await service.fetchCandidate(candidateId);
      
      if (!candidate) {
        logger.error(`Candidate not found in Foundry: ${candidateId}`);
        throw new Error(`Candidate not found: ${candidateId}`);
      }
      
      if (!candidate.resume) {
        logger.warn(`No resume found for candidate ${candidateId}`);
        return '';
      }
      
      logger.info(`Successfully fetched resume for candidate ${candidateId}`);
      return candidate.resume;
    } catch (error) {
      logger.error(`Error fetching candidate from Foundry:`, error);
      throw error;
    }
  }
}