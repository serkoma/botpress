import React from 'react'
import {
  Badge,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
  UncontrolledTooltip
} from 'reactstrap'
import { AccessControl } from '../../../App/AccessControl'
import { IoIosChatbubble } from 'react-icons/lib/io'
import { MdModeEdit, MdArchive, MdDelete, MdLock, MdMoreVert, MdWarning } from 'react-icons/lib/md'
import { FaCog } from 'react-icons/lib/fa'

export default ({ bot, deleteBot, exportBot, permissions, history }) => (
  <div className="bp_table-row" key={bot.id}>
    <div className="actions">
      <Button size="sm" color="link" onClick={() => history.push(`/bot/${bot.id}/details`)}>
        <FaCog /> Configs
      </Button>
      <Button size="sm" color="link" target="_blank" href={`${window.location.origin}/s/${bot.id}`}>
        <IoIosChatbubble /> Open chat
      </Button>
      <UncontrolledButtonDropdown>
        <DropdownToggle tag="span" className="more">
          <MdMoreVert />
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem disabled={bot.locked} tag="a" href={`/studio/${bot.id}`}>
            <MdModeEdit />
            &nbsp;Edit in studio
          </DropdownItem>
          <AccessControl permissions={permissions} resource="admin.bots.*" operation="write">
            <DropdownItem onClick={exportBot}>
              <MdArchive />
              &nbsp;Export
            </DropdownItem>
            <DropdownItem onClick={deleteBot}>
              <MdDelete />
              &nbsp;Delete
            </DropdownItem>
          </AccessControl>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>

    <div className="title">
      {bot.locked && (
        <span>
          <MdLock className="text-primary" />
          &nbsp;
        </span>
      )}
      {bot.disabled ? <span>{bot.name}</span> : <a href={`/studio/${bot.id}`}>{bot.name}</a>}

      {!bot.defaultLanguage && (
        <React.Fragment>
          <MdWarning id={`${bot.id}-warn`} className="text-danger" />
          <UncontrolledTooltip placement="right" target={`${bot.id}-warn`}>
            Bot language is missing. Please set it in bot config.
          </UncontrolledTooltip>
        </React.Fragment>
      )}

      {bot.disabled && (
        <Badge color="warning" className="botbadge">
          disabled
        </Badge>
      )}
      {bot.private && (
        <Badge color="primary" className="botbadge">
          private
        </Badge>
      )}
    </div>
    <p>{bot.description}</p>
  </div>
)
