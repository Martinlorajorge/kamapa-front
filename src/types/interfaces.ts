export interface User {
    id: number;
    nombre?: string;
    apellido?: string;
    dni?: string;
    email?: string;
    password: string;
    role: string;
    accessToken?: string;
    // Puedes agregar más propiedades según las necesidades de tu aplicación
  }