import { VoteType } from './vote-type.enum';

export interface Vote {
    voteType: VoteType;
    postId: number;
}