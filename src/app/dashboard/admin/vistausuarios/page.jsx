'use client';
import Link from 'next/link';

export default function vistainstPage() {
	const CustomButton = () => {
		const handleMouseEnter = (e) => {
			e.currentTarget.style.backgroundColor = 'white';
			e.currentTarget.style.color = 'black';
		};

		const handleMouseLeave = (e) => {
			e.currentTarget.style.backgroundColor = 'purple';
			e.currentTarget.style.color = 'white';
		};

		return (
			<Link href='/dashboard/admin/vistainstitucion/regusuario'>
				<a
					className='btn-purple'
					style={{
						textDecoration: 'none',
						backgroundColor: 'purple',
						color: 'white',
						padding: '0.4rem 1rem',
						fontSize: '1rem',
						transition: 'all 0.3s ease',
					}}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					Nueva Institución
				</a>
			</Link>
		);
	};
}
