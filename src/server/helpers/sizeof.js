export default function sizeof(object) {
  const sizeInBytes = Buffer.byteLength(JSON.stringify(object))
  return sizeInBytes
}
