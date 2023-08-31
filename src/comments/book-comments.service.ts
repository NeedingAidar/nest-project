import { Injectable } from '@nestjs/common';
import { BookCommentModel } from './model/book-comments.model';

@Injectable()
export class BookCommentsService {
    private comments: BookCommentModel[] = [];

    create(comment: BookCommentModel): BookCommentModel {
        this.comments.push(comment);
        return comment;
    }

    findAll(): BookCommentModel[] {
        return this.comments;
    }

    findOne(id: number): BookCommentModel {
        return this.comments.find(comment => comment.id === id);
    }

    update(id: number, updatedComment: BookCommentModel): BookCommentModel {
        const commentIndex = this.comments.findIndex(comment => comment.id === id);
        if (commentIndex !== -1) {
            this.comments[commentIndex] = updatedComment;
            return updatedComment;
        }
        return null;
    }

    delete(id: number): void {
        const commentIndex = this.comments.findIndex(comment => comment.id === id);
        if (commentIndex !== -1) {
            this.comments.splice(commentIndex, 1);
        }
    }

    findAllBookComment(bookId: number): BookCommentModel[] {
        return this.comments.filter(comment => comment.bookId === bookId);
    }
}
