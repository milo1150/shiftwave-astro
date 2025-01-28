import axiosInstanceWithAuth from '@src/middleware/axios'
import { ENDPOINT } from '@src/resources/endpoint'

export const generatePDF = async (payload: {
  branchUuid: string
}): Promise<void> => {
  const response = await axiosInstanceWithAuth(ENDPOINT.generatePDF, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
    },
    params: { branch_uuid: payload.branchUuid },
    responseType: 'blob',
  })

  if (response.status !== 200) {
    throw new Error('Server error')
  }

  const blob = new Blob([response.data], { type: 'application/pdf' }) // Correct Blob type
  const url = window.URL.createObjectURL(blob)

  // V1
  // Open the PDF in a new tab
  window.open(url, '_blank')

  // V2
  // Create a download link
  // const link = document.createElement('a')
  // link.href = url
  // link.download = `CustomFileName.pdf` // Set a custom file name
  // document.body.appendChild(link)
  // link.click()
  // document.body.removeChild(link)

  // Clean up the blob URL
  // window.URL.revokeObjectURL(url)
}
