'use client';
import React, { Suspense } from 'react';
import { Navigation } from '../components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from '../components/Loading'; // Importa el componente de carga

export default function RootLayout({ children }) {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<Navigation />
				{children}
			</Suspense>
		</>
	);
}
