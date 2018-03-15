import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs'

class SongCreate extends Component {
	state = {
		title: ''
	}

	onSubmit = (e) => {
		e.preventDefault()
		this.props.mutate({
			variables: { title: this.state.title },
			refetchQueries: [{ query }]
		}).then(() => hashHistory.push('/'))
	}

	render () {
		return (
			<div>
				<Link to="/">Back</Link>
				<h3>Create New Song</h3>
				<form onSubmit={this.onSubmit}>
					<label>Song Title:</label>
					<input
						type="text"
						onChange={e => this.setState({ title: e.target.value })}
						value={this.state.title}
					/>
				</form>
			</div>
		)
	}
}

const mutation = gql`
	mutation AddSong($title: String){
		addSong(title: $title){
			title
		}
	}
`

export default graphql(mutation)(SongCreate)