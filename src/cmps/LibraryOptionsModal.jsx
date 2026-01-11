import { AddToQueueIcon } from '../assets/svg/AddToQueueIcon.jsx'
import { ExcludeIcon } from '../assets/svg/ExcludeIcon.jsx'
import { ShareIcon } from '../assets/svg/ShareIcon.jsx'
import { PlusIcon } from '../assets/svg/PlusIcon.jsx'
import { ArrowAsideIcon } from '../assets/svg/ArrowAsideIcon.jsx'
import { AlbumIcon } from '../assets/svg/AlbumIcon.jsx'
import { UserIcon } from '../assets/svg/UserIcon.jsx'
import { EditIcon } from '../assets/svg/EditIcon.jsx'
import { DeleteIcon } from '../assets/svg/DeleteIcon.jsx'
import { CreatePlaylistIcon } from '../assets/svg/CreatePlaylistIcon.jsx'
import { MakePrivateIcon } from '../assets/svg/MakePrivateIcon.jsx'
import { InviteCollaboratorsIcon } from '../assets/svg/InviteCollaboratorsIcon.jsx'
import { FolderIcon } from '../assets/svg/FolderIcon.jsx'
import { PinIcon } from '../assets/svg/PinIcon.jsx'

export function LibraryOptionsModal({  onRemoveStation }) {
    return (
        <section className='library-options-modal flex column'>
            <button className='flex align-center'>
                <AddToQueueIcon />
                <span>Add to queue</span>
            </button>

            <button
                className='flex align-center'
            >
                <UserIcon />
                <span>Remove from profile</span>
            </button>

            <button className='flex align-center'>
                <EditIcon />
                <span>Edit details</span>
            </button>

            <button
                className='flex align-center'
                onClick={onRemoveStation}
            >
                <DeleteIcon />
                <span>Delete</span>
            </button>

            <div className='separator'></div>

            <button className='flex align-center'>
                <CreatePlaylistIcon />
                <span>Create playlist</span>
            </button>

            <button className='flex align-center'>
                <PlusIcon />
                <span>Create folder</span>
            </button>

            <div className='separator'></div>

            <button className='flex align-center'>
               <MakePrivateIcon />
                <span>Make private</span>
            </button>

          <button className='flex align-center'>
             <InviteCollaboratorsIcon />
                <span>Invite collaborators</span>
            </button>

            <button className='flex align-center'>
                <ExcludeIcon />
                <span>Exclude from your taste profile</span>
            </button>

            <button className='flex align-center space-between'>
                <div className='flex align-center'>
                    <FolderIcon/>
                    <span>Move to folder</span>
                </div>
                <ArrowAsideIcon />
            </button>

            <button className='flex align-center'>
               <PinIcon />
                <span>Pin playlist</span>
            </button>

            <button className='flex align-center space-between'>
                <div className='flex align-center'>
                    <ShareIcon />
                    <span>Share</span>
                </div>
                <ArrowAsideIcon />
            </button>
        </section>
    )
}
