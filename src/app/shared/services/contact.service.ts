import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly SERVICE_ID = 'service_i9i8qaz';
  private readonly TEMPLATE_ID = 'template_c2oni1r';
  private readonly PUBLIC_KEY = '22sZ204Ulqn0jwVNI';

  async enviarFormulario(data: { name: string; email: string; message: string }): Promise<void> {
    await emailjs.send(
      this.SERVICE_ID,
      this.TEMPLATE_ID,
      {
        nombre: data.name,
        email: data.email,
        mensaje: data.message
      },
      this.PUBLIC_KEY
    );
  }
}
