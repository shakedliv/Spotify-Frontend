import { useCallback, useState } from 'react'
import { updateStation } from '../store/actions/station.actions'
import { useDropzone } from 'react-dropzone'
import { CloseIconX, EditPenIcon, LockIcon } from '../services/svg.service'

export function StationEdit({ station, onClose }) {

  const imgUrl = station?.tracks[0]?.track.album.images[0].url
  const [stationToEdit, setStationToEdit] = useState(station)
  const [imagePreview, setImagePreview] = useState(imgUrl || station.imgUrl)


  const onDrop = useCallback((acceptedFiles) => {

    const file = acceptedFiles[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      const reader = new FileReader()
      reader.onloadend = () => {
        setStationToEdit(prev => ({ ...prev, imgUrl: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } })

  function handleChange({ target }) {
    const { name, value } = target
    setStationToEdit(prev => ({ ...prev, [name]: value }))
  }

  async function onSave(ev) {
    ev.preventDefault()
    await updateStation(stationToEdit)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="station-edit-modal" onClick={ev => ev.stopPropagation()}>

        <header className='modal-header'>
          <h2>Edit details</h2>
          <button className="close-modal-btn" type="button" onClick={onClose} ><CloseIconX /></button>
        </header>

        <form onSubmit={onSave} className="station-edit-form">
          {/* <div className='text-edit-container'> */}
          <label className='name-edit'>
            <input
              name="name"
              value={stationToEdit.name || ''}
              onChange={handleChange}
            />
          </label>

          <label className='desc-edit'>
            <textarea
              name="description"
              placeholder='Add an optional desription'
              value={stationToEdit.description || ''}
              onChange={handleChange}
            />
          </label>
          {/* </div> */}

          <label className="image-upload">
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="" />
                <div className='image-backdrop'>
                  <button
                    className="remove-image"
                    type="button"
                    onClick={() => {
                      setImagePreview('')
                      setStationToEdit(prev => ({ ...prev, imgUrl: '' }))
                    }}> <CloseIconX /> </button>

                  <div
                    {...getRootProps()}
                    className="upload-area"
                  >
                    <input {...getInputProps()} /> <span> <EditPenIcon /> Choose Photo</span>
                  </div>
                </div>
              </div>
            )}

          </label>

          <button className="save-btn" type="submit">Save</button>
          <button className="private-btn" type="button"> <LockIcon />Make private</button>

          <p className='disclaimer'>By proceeding, you agree to give Statify access to the image you choose to upload. Please make sure you have the right to upload the image. (not really...)</p>

        </form>
      </div>
    </div >
  )
}