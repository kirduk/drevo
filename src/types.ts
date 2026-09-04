export interface GalleryImage {
  file: string
  title: string
  category?: string
}

export interface GalleryManifest {
  images: GalleryImage[]
}

export interface Product {
  title: string
  description: string
  icon: string
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  hours: string
}
