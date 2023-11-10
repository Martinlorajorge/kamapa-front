'use client'
const handleFileChange = (e, setFormState) => {
  const file = e.target.files[0]

  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      const logoDataUrl = reader.result
      setFormState((prevFormState) => ({
        ...prevFormState,
        institucion: {
          ...prevFormState.institucion,
          logo: logoDataUrl // Actualiza el campo del logo en el estado del formulario
        }
      }))
    }
    reader.readAsDataURL(file)
  }
}
export default handleFileChange
