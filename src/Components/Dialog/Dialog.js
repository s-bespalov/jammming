import React from 'react';
import PropTypes from 'prop-types';
import './Dialog.css';

export const DialogType = {
  Saving: "saving",
  Saved: "saved",
  Failed: "failed",
  NothingSave: "nothing",
  Expired: "expired"
}

export class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.showContent = this.showContent.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.login = this.login.bind(this);
  }

  render() {
    return (
      <div className="outer">
        <div className="box">
          {this.showContent()}
        </div>
      </div>
    );
  }

  close() {
    //clean a play list if it was saved to deezer
    const clean = this.props.dialogType === DialogType.Saved;
    this.props.onClose(clean);
  }

  open() {
    this.props.onOpen();
  }

  login() {
    this.props.onLogin(true); //forced
  }

  showContent() {
    if (this.props.dialogType === DialogType.Saving) {
      return (<h1 className="label">Saving...</h1>);
    }
    if (this.props.dialogType === DialogType.Saved) {
      return (
        <div className="content">
          <h1 className="label">Saved</h1>
          <div className="buttons-block">
            <button className="dialog-button" onClick={this.open} >OPEN PLAYLIST</button>
            <button className="dialog-button" onClick={this.close} >CLOSE</button>
          </div>
        </div>
      );
    }
    if (this.props.dialogType === DialogType.Failed) {
      return (
        <div className="content">
          <h1 className="label">Not Saved</h1>
          <h1 className="label">:&#39;(</h1>
          <div className="buttons-block">
            <button
              className="dialog-button"
              onClick={this.close}
            >
                CLOSE
              </button>
          </div>
        </div>
      );
    }
    if (this.props.dialogType === DialogType.NothingSave) {
      return (
        <div className="content">
          <h1 className="label">Nothing to Save</h1>
          <div className="buttons-block">
            <button
              className="dialog-button"
              onClick={this.close}
            >
              CLOSE
            </button>
          </div>
        </div>
      );
    }
    if (this.props.dialogType === DialogType.Expired) {
      return (
        <div className="content">
          <h1 className="label">Access Expired</h1>
          <div className="buttons-block">
            <button
              className="dialog-button"
              onClick={this.login}
            >
              LOG IN
            </button>
          </div>
        </div>
      );
    }

    return <p>this.props.dialogType</p>
  }
}

Dialog.propTypes = {
  dialogType: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onLogin: PropTypes.func
}
