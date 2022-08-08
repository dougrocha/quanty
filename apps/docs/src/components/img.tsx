import Image, { ImageProps } from 'next/image'
import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomImage = (props: ImageProps) => (
  <Image {...props} alt={props.alt} layout="responsive" />
)

export default CustomImage
