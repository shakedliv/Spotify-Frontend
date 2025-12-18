import { useState } from 'react'
import { updateStation } from '../store/actions/station.actions'

export function StationEdit({ station, onClose }) {
  const [stationToEdit, setStationToEdit] = useState(station)

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
      <div className="modal" onClick={ev => ev.stopPropagation()}>
        <h2>Edit details</h2>

        <form onSubmit={onSave} className="station-edit-form">
          <label>
            <input
              name="name"
              value={stationToEdit.name || ''}
              onChange={handleChange}
            />
          </label>

          <label>
            <textarea
              name="description"
              value={stationToEdit.description || ''}
              onChange={handleChange}
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