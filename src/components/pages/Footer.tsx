
export default function Footer() {
    return (
      <footer className="text-center font-[16px] dark:bg-black dark:text-zinc-200 text-black bg-zinc-200">
          <div className="py-6 flex flex-col justify-center items-center">
              <p>Contact us : datavista.tech@gmail.com</p>
              <p className="mt-4">Social Media</p>
              <div className="sm:grid sm:grid-cols-3 sm:w-[60%] mb-4 mt-1">
                <p>X</p>
                <p>Linkedin</p>
                <p>Instagram</p>
              </div>
                <p>© 2025 YourCompany. All Rights Reserved.</p>
          </div>
      </footer>
    )
  }
  