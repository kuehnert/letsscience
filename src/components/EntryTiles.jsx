import React from "react"
import EntryTile from "./EntryTile"

const EntryTiles = ({ edges }) => {
  if (edges.length !== 3) {
    return
  }

  return (
    <div class="tile is-vertical">
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <EntryTile classNames="is-child box" node={edges[0].node} />
          <EntryTile classNames="is-child box" node={edges[1].node} />
        </div>
        <div class="tile is-parent is-hidden-mobile">
          <EntryTile classNames="is-child box" truncateLines={10} node={edges[2].node} />
        </div>
      </div>
    </div>
  )
}

export default EntryTiles
