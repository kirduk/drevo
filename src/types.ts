export interface ProductItem {
  id: string
  title: string
  description: string
  images: string[]
}

export interface GalleryImage {
  file: string
  title: string
  category?: string
}

export interface GalleryManifest {
  images: GalleryImage[]
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  hours: string
}
