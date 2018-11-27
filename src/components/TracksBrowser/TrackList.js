import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { TrackItem } from './TrackItem';


const renderList = tracks => (
    <div className="list-group animated fadeIn">
        {zipCodes.map(zipCode => renderListItem(zipCode))}
    </div>
);

const renderListItem = track => (
    <Fragment key={track._id}>
        <TrackItem user={track.user} notes={track.notes} />
    </Fragment>
);

const TrackList = (props) => (
    <Fragment>
        {renderList(props.tracks)}
    </Fragment>
);

TrackList.propTypes = {
    tracks: PropTypes.array.isRequired
};

export { TrackList };