import { ref } from 'vue'

export function useMaterials() {
  const categories = ref([
    { 
      title: 'Presentations', 
      items: [
        { name: 'PDF Presentation', file: '/public/assets/Bellefort_Estates _Presentation.pdf', type: 'PDF' },
        { name: 'Video Presentation', file: '/assets/BFE RFO(ANA).mp4', type: 'Video' }
      ]
    },
    { 
      title: 'Sales Tools', 
      items: [
        { name: 'Latest Price List', file: '/public/assets/PL 1.png', type: 'PDF' },
        { name: 'Latest Price List', file: '/public/assets/PL 2.png', type: 'PDF' },
        { name: 'Latest Price List', file: '/public/assets/PL 3.png', type: 'PDF' },
        { name: 'Latest Price List', file: '/public/assets/PL 4.png', type: 'PDF' },
      ]
    },
    { 
      title: 'Technical Docs', 
      items: [
        { name: 'Charlotte Plans', file: '/public/assets/BFE floor plan/Charlotte floor plan.png', type: 'Image' },
        { name: 'Sabine' , file: '/public/assets/BFE floor plan/Sabine floor plan.png', type: 'Image' },
        { name: 'Vivienne', file: '/public/assets/BFE floor plan/Vivienne floor plan.png', type: 'Image' },
      ]
    },
    {
        title: 'Site Maps',
        items: [
            { name: 'Official Site Map - Phase 1', file: '/public/assets/BFE Map/Phase1 BFE.pdf', type: 'PDF' },
            { name: 'Official Site Map - Phase 2', file: '/public/assets/BFE Map/Phase 2 BFE.pdf', type: 'PDF' },
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