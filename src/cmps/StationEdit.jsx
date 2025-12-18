import { useState } from 'react'
import { updateStation } from '../store/actions/station.actions'

export function StationEdit({ station, onClose }) {
  const [name, setName] = useState(station.name || '')
  const [description, setDescription] = useState(station.description || '')
  const [imgUrl, setImgUrl] = useState(station.imgUrl || '')

  async function onSave(ev) {
    ev.preventDefault()
    const updatedStation = {
      ...station,
      name,
      description,
      imgUrl,
    }
    await updateStation(updatedStation)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={ev => ev.stopPropagation()}>
        <h2>Edit details</h2>

        <form onSubmit={onSave} className="station-edit-form">
          <label>
            <input
              value={name}
              onChange={ev => setName(ev.target.value)}
            />
          </label>

          <label>
            <textarea
              value={description}
              onChange={ev => setDescription(ev.target.value)}
            />
          </label>


          <div className="actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
