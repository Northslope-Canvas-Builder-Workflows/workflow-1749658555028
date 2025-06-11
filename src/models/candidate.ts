export interface Candidate {
  id: string;
  candidateId: string;
  name: string;
  email: string;
  resume: string;
}

export interface CandidateEditParams {
  name: string;
  resume: string;
  email: string;
}

export interface CandidateCreateParams {
  candidateId: string;
  name: string;
  email: string;
  resume: string;
}