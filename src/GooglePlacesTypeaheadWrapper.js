import React, { useCallback, useEffect, useState } from 'react'

import GooglePlacesTypeahead, {
    geocodeByPlaceId,
    getLatLng,
    loadScript
} from '@netojose/react-google-places-typeahead'

function GooglePlacesTypeaheadWrapper() {
    useEffect(() => {
        const apiKey = 'AIzaSyD_UOWFmU7A58pNU-axruBKz4-UcmatBpo'
        const callback = 'mapsDone'
        loadScript(apiKey, callback)
    }, [])

    const [value, setValue] = useState('')

    const handleChange = useCallback(term => setValue(term), [])

    const handleSelect = useCallback(item => {
        geocodeByPlaceId(item.placeId).then(r => {
            console.log(r[0])
            getLatLng(r[0]).then(latlng => {
                console.log(latlng)
            })
        })
    }, [])

    return (
        <GooglePlacesTypeahead
            gMapsCallback='mapsDone'
            value={value}
            onChange={handleChange}
            onSelect={handleSelect}
            searchOptions={{ types: ['address'] }}
        >
            {({
                isLoading,
                showList,
                suggestions,
                getInputProps,
                getSuggestionItemProps
            }) => (
                <>
                    <input
                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input'
                        })}
                    />
                    {showList && (
                        <div>
                            {isLoading && <div>Loading...</div>}
                            <ul>
                                {suggestions.map(suggestion => {
                                    const style = suggestion.active
                                        ? { background: 'red' }
                                        : {}
                                    return (
                                        <li
                                            {...getSuggestionItemProps(
                                                suggestion
                                            )}
                                            style={style}
                                        >
                                            {suggestion.description}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </GooglePlacesTypeahead>
    )
}

export default GooglePlacesTypeaheadWrapper
