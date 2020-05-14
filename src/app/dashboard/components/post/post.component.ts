import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { IPost } from '../../../shared/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public postForm: FormGroup;
  public isSubmit = false;

  constructor(private _postService: PostsService) {
  }

  get f() {
    return this.postForm.controls;
  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required)
    });
  }

  submit() {
    this.isSubmit = true;

    if (this.postForm.invalid) {
      // this.postForm.markAllAsTouched();
      return;
    }
    const post: IPost = {
      ...this.postForm.value,
      date: new Date()
    };
    this._postService.create(post)
      .subscribe(() => {
        this.isSubmit = false;
        this.postForm.reset();
      });
  }
}
