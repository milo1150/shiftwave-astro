import { ENDPOINT } from '@src/resources/endpoint'

export const generatePDF = async (payload: {
  branchId: number
}): Promise<void> => {
  // Construct URL with query parameters
  const baseUrl = new URL(ENDPOINT.generatePDF)
  baseUrl.searchParams.append('branch_id', payload.branchId.toString())

  const response = await fetch(baseUrl.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
    },
  })

  if (!response.ok) {
    throw new Error('Server error')
  }

  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob) // Create a URL for the Blob
  console.log(blob, url)

  // Trigger a download
  const link = document.createElement('a')
  link.href = url
  link.download = 'GeneratedPDF.pdf' // File name for the download
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
