export interface User {
    id: number;
    username?: string;
    email?: string;
    password: string;
    role: string;
    accessToken?: string;
    // Puedes agregar más propiedades según las necesidades de tu aplicación
  }