import { Injectable } from '@angular/core';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { db } from '../../firebase';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly SERVICE_ID = 'service_i9i8qaz';
  private readonly TEMPLATE_ID = 'template_c2oni1r';
  private readonly PUBLIC_KEY = '22sZ204Ulqn0jwVNI';

  async enviarFormulario(data: { name: string; email: string; message: string }) {
    try {
      // 1. Guardar en Firestore
      const docRef = await addDoc(collection(db, 'contactos'), {
        ...data,
        createdAt: serverTimestamp()
      });

      // 2. Enviar email vía EmailJS
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

      return docRef;
    } catch (error) {
      console.error('Error en el proceso de contacto:', error);
      throw error;
    }
  }
}
