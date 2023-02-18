export default interface CarouselCardProps<T> {
  element: T
  height: number
  //aspectRatio: number 
  handleElementSelected?: (element: T) => void
  classNameOuter?: string
}
