import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/interfaces/Photo';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {
  id: string
  photo: Photo

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id']
      this.photoService.getPhoto(this.id)
      .subscribe(
        res => this.photo = res,
        err => console.log(err)
      )
    })
  }

  updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
    this.photoService.updatePhoto(this.id, title.value, description.value)
      .subscribe(
        res => this.router.navigate(['/photos']),
        err => console.log(err)
      )
      return false
  }

  deletePhoto(id: string) {
    this.photoService.deletePhoto(id)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/photos'])
        },
        err => console.log(err)
      )
  }

}
