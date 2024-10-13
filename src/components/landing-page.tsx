"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle, Menu, ShoppingCart, Star, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"

type Product = {
  id: string
  name: string
  description: string
  price: number
  rating: number
  image: string
}

export function LandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [offer, setOffer] = useState('')

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products?page=0&limit=10")
      setProducts(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  const successToast = () => {
    toast.success("Offer submitted successfully!")
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOffer('')
    try {
      const response = axios.post("http://localhost:8000/api/offers", {"text" : offer})
      successToast()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <img
            src="https://spotify-nf.s3.eu-north-1.amazonaws.com/image_2024-10-13_12-27-25.png"
            width={32}
            height={32}
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="ml-2 text-lg font-bold">Xme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className={`${isMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row absolute md:relative top-14 md:top-0 left-0 md:left-auto w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 gap-4 border-b md:border-0`}>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Features
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              About
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Contact
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Xme Inc
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  We're revolutionizing the way you work. Join us and experience the future of productivity.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <CheckCircle className="h-8 w-8 text-neutral-900 dark:text-neutral-50" />
                <h3 className="text-xl font-bold">Easy to Use</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Our intuitive interface makes it simple to get started.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <CheckCircle className="h-8 w-8 text-neutral-900 dark:text-neutral-50" />
                <h3 className="text-xl font-bold">Powerful Analytics</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Gain insights with our advanced analytics tools.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-200 p-4 rounded-lg">
                <CheckCircle className="h-8 w-8 text-neutral-900 dark:text-neutral-50" />
                <h3 className="text-xl font-bold">Secure & Reliable</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Your data is safe with our top-notch security measures.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Products
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <div key={product.id} className="group relative overflow-hidden rounded-lg border  border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-neutral-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    
                    className="w-full md:h-[60vh] object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Do you have any suggestions?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  You can offer your ideas on how to improve our service. We value your feedback!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2" onSubmit={handleSubmit}>
                  <Input className="max-w-lg flex-1" placeholder="Enter your offer" type="text" value={offer} onChange={(e) => setOffer(e.target.value)}/>
                  <Button type="submit">
                    Subscribe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Do not forget Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Xme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}