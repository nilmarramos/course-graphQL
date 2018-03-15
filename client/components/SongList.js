import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router';
import query from '../queries/fetchSongs'

class SongList extends Component {
	onSongDelete = (id) => {
		this.props.mutate({ variables: { id: id} })
			.then(() => this.props.data.refetch())
	}

	renderSongs = () => {
		const {songs} = this.props.data
		return songs.map(({ id, title }) => {
			return (
				<li className="collection-item" key={ id }>
					<Link to={`/songs/${id}`}>
						{ title }
					</Link>
					<i className="material-icons"
					   onClick={() => this.onSongDelete(id)}
					>
						delete
					</i>
				</li>
			)
		})
	}
	render () {
		const {loading} = this.props.data
		if (loading) { return <div>Loading...</div>}
		return (
			<div>
				<h3>Song List</h3>
				<ul className="collection">
					{this.renderSongs()}
				</ul>
				<Link
					to="/songs/new"
					className="btn-floating btn-large red right"
				>
					<i className="material-icons">add</i>
				</Link>
			</div>
		)
	}
}

const mutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
		}
	}
`

export default graphql(mutation)(
	graphql(query)(SongList)
)