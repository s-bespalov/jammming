import React from 'react';
import PropTypes from 'prop-types';
import './Track.css';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  renderAction() {
    let button;
    if (this.props.isRemoval)
    {
      button = (
        <button className="Track-action" onClick={this.removeTrack}>-</button>
      );
    } else {
      button = (
        <button className="Track-action" onClick={this.addTrack}>+</button>
      );
    }

    return button;
  }

  renderPreview() {
    if (this.props.isRemoval) {
      return;
    }

    return (
      <audio
      controls
      src={this.props.track.preview}
      className="Track-audio">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    );
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-text">
          <div className="Track-information">
            <h3>{this.props.track.name}</h3>
            <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
          <button className="Track-action">{this.renderAction()}</button>
        </div>
        {this.renderPreview()}
      </div>
    );
  }
}

Track.propTypes = {
  track: PropTypes.object,
  isRemoval: PropTypes.bool,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func
}
