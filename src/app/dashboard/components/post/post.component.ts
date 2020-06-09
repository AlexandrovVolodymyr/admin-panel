import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { IPost } from '../../../shared/interfaces/post';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormErrorStateMatcher } from '../../utils/form-error-state-matcher';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  public postForm: FormGroup;
  public isSubmit = false;
  public errorStateMatcher: FormErrorStateMatcher;

  private _unsubscribe: Subject<void> = new Subject<void>();

  constructor(private _postService: PostsService) {
    this.errorStateMatcher = new FormErrorStateMatcher();
  }

  get controls() {
    return this.postForm.controls;
  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      message: new FormControl(null, Validators.required)
    });
  }

  public submit() {
    this.isSubmit = true;

    if (this.postForm.valid) {
      const post: IPost = {
        ...this.postForm.value,
        date: new Date()
      };
      this._postService.create(post)
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(() => {
          this.isSubmit = false;
          this.postForm.reset();
        });
    } else {
      this.postForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
