import React from 'react';
import SmallCards from '../Misc/SmallCards';
import { personType } from '../types';

const Filmography = ({ data }) => (
  <div>
    <h3 className="mt-4 mb-4">Filmography</h3>
    {data.combined_credits.cast.map(x => (
      <SmallCards
        key={x.credit_id}
        data={x}
        page="filmography"
        type={x.media_type}
      />
    ))}
  </div>
);

Filmography.propTypes = {
  data: personType.isRequired,
};

export default Filmography;
