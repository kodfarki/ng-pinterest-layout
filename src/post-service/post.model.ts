// import { Comment } from '../comment';
export class Post {
    constructor(
        public id?: number,
        public imgUrl?: string,
        public thumbnail?: string,
        public source?: string,
        public title?: string,
        public likeCount?: number,
        public viewCount?: number,
        public creationTime?: any,
        public modificationTime?: any,
        // public comments?: Comment,
        public author?: any,
        public likedUsers?: any,
    ) {
    }
}
