import { Client, Osdk, isOk, Result, PageResult } from '@osdk/client';
import { 
  Candidate,
  editCandidate,
} from '@ai-generated-workflow/sdk';
import { Logger } from '../../utils/logger';

const logger = new Logger('CandidateService');

export class CandidateService {
  constructor(private client: Client) {}

  async fetchCandidate(id: string): Promise<CandidateType | null> {
    try {
      const result: Result<Osdk.Instance<Candidate>> = await this.client(Candidate).fetchOneWithErrors(id);
      
      if (isOk(result)) {
        logger.info(`Successfully fetched candidate with id: ${id}`);
        return this.mapFoundryObjectToDomainModel(result.value);
      } else {
        logger.error(`Error fetching candidate with id: ${id}`, result.error.message);
        return null;
      }
    } catch (error) {
      logger.error(`Unexpected error fetching candidate with id: ${id}:`, error);
      return null;
    }
  }

  async updateCandidate(id: string, data: Partial<CandidateUpdateData>): Promise<CandidateType | null> {
    try {
      // First fetch the current candidate to get the object reference
      const currentCandidateResult: Result<Osdk.Instance<Candidate>> = await this.client(Candidate).fetchOneWithErrors(id);
      
      if (!isOk(currentCandidateResult)) {
        logger.error(`Error fetching candidate with id: ${id}`);
        return null;
      }

      const currentCandidate = currentCandidateResult.value;
      
      // Prepare the action parameters with only defined values
      const actionParams: any = {
        Candidate: currentCandidate
      };
      
      if (data.name !== undefined) {
        actionParams.name = data.name;
      }
      if (data.email !== undefined) {
        actionParams.email = data.email;
      }
      if (data.resume !== undefined) {
        actionParams.resume = data.resume;
      }

      // Execute the edit action
      const result = await this.client(editCandidate).applyAction(
        actionParams,
        {
          $returnEdits: true
        }
      );

      if (result && result.type === 'edits') {
        logger.info(`Successfully updated candidate with id: ${id}`);
        
        // Fetch the updated candidate to return the latest data
        const updatedCandidateResult = await this.client(Candidate).fetchOneWithErrors(id);
        
        if (isOk(updatedCandidateResult)) {
          return this.mapFoundryObjectToDomainModel(updatedCandidateResult.value);
        }
      }
      
      logger.error(`Failed to update candidate with id: ${id}`);
      return null;
    } catch (error) {
      logger.error(`Unexpected error updating candidate with id: ${id}:`, error);
      return null;
    }
  }

  private async mapFoundryObjectToDomainModel(foundryObject: Osdk.Instance<Candidate>): Promise<CandidateType> {
    return {
      id: foundryObject.$primaryKey,
      candidateId: foundryObject.candidateId,
      name: foundryObject.name || '',
      email: foundryObject.email || '',
      resume: foundryObject.resume || ''
    };
  }
}

// Type definitions for the domain model
export interface CandidateType {
  id: string;
  candidateId: string;
  name: string;
  email: string;
  resume: string;
}

export interface CandidateUpdateData {
  name?: string;
  email?: string;
  resume?: string;
}
