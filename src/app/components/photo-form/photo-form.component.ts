import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Router } from '@angular/router';

// Para especificar el tipo de evento
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  file: File
  photoSelected: string | ArrayBuffer

  constructor(private photoService: PhotoService, private router: Router) { }

  ngOnInit() {
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if(event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0]
      // image preview
      const reader = new FileReader() // Para leer un archivo
      reader.onload = e => this.photoSelected = reader.result // Cuando lea el archivo, guardalo en photoSelected
      reader.readAsDataURL(this.file)
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
    this.photoService.createPhoto(title.value, description.value, this.file)
      .subscribe(
        res => this.router.navigate(['/photos']),
        err => console.log(err))
    return false
  }

}
