"use client"
import { IconArrowNarrowRight, IconTrash } from "@tabler/icons-react"
import { useState, useRef, useCallback } from "react"
import { Message } from "@/models/user.model"
import axios, { AxiosError } from 'axios'
import { useToast } from "@/hooks/use-toast"
import { ApiResponse } from "@/helper/ApiResponse"
import mongoose from "mongoose"


interface SlideProps {
  message: Message
  onDelete: (id: mongoose.Types.ObjectId) => void
}



const Slide = ({ message, onDelete }: SlideProps) => {
  const { _id, content, createdAt } = message
  return (
    <li className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 snap-start">
      <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
        <article className="p-4 flex flex-col justify-between h-full relative">
          <button
            onClick={() => onDelete(_id)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
            aria-label="Delete message"
          >
            <IconTrash size={18} />
          </button>
          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 mb-4 pr-6">
            {content.length > 150 ? `${content.slice(0, 150)}...` : content}
          </p>
          <time className="text-xs text-gray-500 dark:text-gray-400 mt-auto">{createdAt.toLocaleString()}</time>
        </article>
      </div>
    </li>
  )
}

interface CarouselControlProps {
  type: string
  title: string
  handleClick: () => void
}

const CarouselControl = ({ type, title, handleClick }: CarouselControlProps) => {
  return (
    <button
      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 flex-shrink-0 ${
        type === "previous" ? "rotate-180 mr-2" : "ml-2"
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200 w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  )
}

interface CarouselProps {
  initialMessages: Message[]
}

export default function Carousel({ initialMessages }: CarouselProps) {
  const [messages, setMessages] = useState(initialMessages)
  const scrollRef = useRef<HTMLUListElement>(null)
  const {toast} = useToast()

  const handlePreviousClick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollRef.current.offsetWidth, behavior: "smooth" })
    }
  }

  const handleNextClick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollRef.current.offsetWidth, behavior: "smooth" })
    }
  }

  const handleDelete = useCallback(async (id: mongoose.Types.ObjectId) => {
    setMessages((prevMessages) => prevMessages.filter((message) => message._id.toString() !== id.toString()))
    try {
      const response = await axios.delete(`/api/delete-message/${id.toString()}`)
      toast({
        title:"Message deleted successfully",
        description: response.data.message,
        variant: "default"
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast({
        title:"Failed to delete the message",
        description: axiosError.response?.data.message || "",
        variant: "destructive"
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="relative w-full mx-auto">
      <div className="flex items-center">
        <CarouselControl type="previous" title="Go to previous slide" handleClick={handlePreviousClick} />
        <div className="overflow-hidden flex-grow">
          <ul
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {messages.map((message) => (
              <Slide key={message._id.toString()} message={message} onDelete={handleDelete} />
            ))}
          </ul>
        </div>
        <CarouselControl type="next" title="Go to next slide" handleClick={handleNextClick} />
      </div>
    </div>
  )
}

