import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from '../post';

@Pipe({
  name: 'searchPosts'
})
export class SearchPostsPipe implements PipeTransform {

  transform(posts: IPost[], value = ''): IPost[] {
    if (!value) {
      return posts;
    }

    return posts.filter(post => {
      return post.name.toLowerCase().includes(value.toLowerCase());
    });
  }

}
