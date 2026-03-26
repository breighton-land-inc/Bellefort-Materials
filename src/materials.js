import { ref } from 'vue'

export function useMaterials() {
  // We define the base URL dynamically.
  // In development, it points locally so new files load before deployment, factoring in the Vite base path.
  // In production, it points to the exact GitHub Pages location.
  const baseUrl = import.meta.env.DEV ? import.meta.env.BASE_URL + 'assets' : 'https://breighton-land-inc.github.io/Bellefort-Materials/assets'

  const categories = ref([
    { 
      title: 'Presentations', 
      items: [
        { name: 'PDF Presentation', file: `assets/Bellefort_Estates _Presentation.pdf`, type: 'PDF' },
        { name: 'Video Presentation', file: `${baseUrl}/BFE RFO(ANA).mp4`, type: 'Video' }
      ]
    },
    { 
      title: 'Sales Tools', 
      items: [
        { name: 'Latest Price List 1', file: `${baseUrl}/PL 1.png`, type: 'Image' },
        { name: 'Latest Price List 2', file: `${baseUrl}/PL 2.png`, type: 'Image' },
        { name: 'Latest Price List 3', file: `${baseUrl}/PL 3.png`, type: 'Image' },
        { name: 'Latest Price List 4', file: `${baseUrl}/PL 4.png`, type: 'Image' },
      ]
    },
    { 
      title: 'Floor Plans', 
      items: [
        { name: 'Charlotte floor Plan', file: `${baseUrl}/BFE floor plan/Charlotte floor plan.png`, type: 'Image' },
        { name: 'Sabine Floor Plan', file: `${baseUrl}/BFE floor plan/Sabine floor plan.png`, type: 'Image' },
        { name: 'Sabine 2nd Floor Plan', file: `${baseUrl}/BFE floor plan/2nd_floor_plan_sabine.jpg`, type: 'Image' },
        { name: 'Vivienne floor Plan', file: `${baseUrl}/BFE floor plan/Vivienne floor plan.png`, type: 'Image' },
        { name: 'Vivienne 2nd Floor Plan', file: `${baseUrl}/BFE floor plan/2nd_floor_plan_vivienne.jpg`, type: 'Image' },
      ]
    },
    {
      title: 'Technical Docs',
      items: [
        { name: 'House Warranty Coverage', file: `${baseUrl}/House Warranty Coverage.jpg`, type: 'Image' },
      ]
    },

    {
        title: 'Site Maps',
        items: [
            { name: 'Official Site Map - Phase 1', file: `${baseUrl}/BFE Map/Phase1 BFE.pdf`, type: 'PDF' },
            { name: 'Official Site Map - Phase 2', file: `${baseUrl}/BFE Map/Phase 2 BFE.pdf`, type: 'PDF' },
        ]
    }
  ])

  const isModalOpen = ref(false)
  const selectedFile = ref(null)

  const openPreview = (item) => {
    selectedFile.value = item
    isModalOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  const closePreview = () => {
    isModalOpen.value = false
    selectedFile.value = null
    document.body.style.overflow = 'auto'
  }

  const downloadFile = (url, name) => {
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', name)
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return { categories, isModalOpen, selectedFile, openPreview, closePreview, downloadFile }
}