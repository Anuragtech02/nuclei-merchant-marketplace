import citiesWithNames from './mock/cities.json';

export const HEADER_HEIGHT = {
	DEFAULT: '80px',
	MOBILE: '80px'
};

export const LS_RECENT_SEARCHES = 'NUCLEI_MM_RECENT_SEARCHES';

export const CITIES = [
	{ name: 'Ahmedabad', code: 'AMD' },
	{ name: 'Agra', code: 'AGR' },
	{ name: 'Aizawl', code: 'AJL' },
	{ name: 'Amritsar', code: 'ATQ' },
	{ name: 'Agartala', code: 'IXA' },
	{ name: 'Allahabad', code: 'IXD' },
	{ name: 'Amritsar', code: 'ATQ' },
	{ name: 'Aurangabad', code: 'IXU' },
	{ name: 'Bengaluru', code: 'BLR' },
	{ name: 'Bhopal', code: 'BHO' },
	{ name: 'Bhubaneswar', code: 'BBI' },
	{ name: 'Bhavnagar', code: 'BHU' },
	{ name: 'Belgaum', code: 'IXG' },
	{ name: 'Bilaspur', code: 'PAB' },
	{ name: 'Bikaner', code: 'BKB' },
	{ name: 'Bhuj', code: 'BHJ' },
	{ name: 'Chandigarh', code: 'IXC' },
	{ name: 'Chennai', code: 'MAA' },
	{ name: 'Coimbatore', code: 'CJB' },
	{ name: 'Cochin', code: 'COK' },
	{ name: 'Cuttack', code: 'BBI' },
	{ name: 'Dehradun', code: 'DED' },
	{ name: 'Daman', code: 'NMB' },
	{ name: 'Dadra Nagar Haveli', code: 'NMB' },
	{ name: 'Diu', code: 'DIU' },
	{ name: 'Dharamshala', code: 'DHM' },
	{ name: 'Durgapur', code: 'RDP' },
	{ name: 'Dibrugarh', code: 'DIB' },
	{ name: 'Dimapur', code: 'DMU' },
	{ name: 'Diu', code: 'DIU' },
	{ name: 'Gaya', code: 'GAY' },
	{ name: 'Gorakhpur', code: 'GOP' },
	{ name: 'Gwalior', code: 'GWL' },
	{ name: 'Guwahati', code: 'GAU' },
	{ name: 'Guna', code: 'GUX' },
	{ name: 'Gangtok', code: 'IXB' },
	{ name: 'Guna', code: 'GUX' },
	{ name: 'Gwalior', code: 'GWL' },
	{ name: 'Hyderabad', code: 'HYD' },
	{ name: 'Indore', code: 'IDR' },
	{ name: 'Imphal', code: 'IMF' },
	{ name: 'Jabalpur', code: 'JLR' },
	{ name: 'Jaipur', code: 'JAI' },
	{ name: 'Jodhpur', code: 'JDH' },
	{ name: 'Jammu', code: 'IXJ' },
	{ name: 'Jamnagar', code: 'JGA' },
	{ name: 'Jharsuguda', code: 'IXW' },
	{ name: 'Jaisalmer', code: 'JSA' },
	{ name: 'Jodhpur', code: 'JDH' },
	{ name: 'Kolkata', code: 'CCU' },
	{ name: 'Kochi', code: 'COK' },
	{ name: 'Kanpur', code: 'KNU' },
	{ name: 'Kozhikode', code: 'CCJ' },
	{ name: 'Kolhapur', code: 'KLH' },
	{ name: 'Kota', code: 'KTU' },
	{ name: 'Kulu', code: 'KUU' },
	{ name: 'Kullu', code: 'KUU' },
	{ name: 'Kanpur', code: 'KNU' },
	{ name: 'Kolhapur', code: 'KLH' },
	{ name: 'Kota', code: 'KTU' },
	{ name: 'Ludhiana', code: 'LUH' },
	{ name: 'Lucknow', code: 'LKO' },
	{ name: 'Leh', code: 'IXL' },
	{ name: 'Ludhiana', code: 'LUH' },
	{ name: 'Lucknow', code: 'LKO' },
	{ name: 'Mumbai', code: 'BOM' },
	{ name: 'Mangalore', code: 'IXE' },
	{ name: 'Madurai', code: 'IXM' },
	{ name: 'Mysore', code: 'MYQ' },
	{ name: 'Mumbai', code: 'BOM' },
	{ name: 'Mangalore', code: 'IXE' },
	{ name: 'Madurai', code: 'IXM' },
	{ name: 'Mysore', code: 'MYQ' },
	{ name: 'Nagpur', code: 'NAG' },
	{ name: 'Nanded', code: 'NDC' },
	{ name: 'Nasik', code: 'ISK' },
	{ name: 'Nasik Road', code: 'ISK' },
	{ name: 'Nagpur', code: 'NAG' },
	{ name: 'New Delhi', code: 'DEL' },
	{ name: 'Pune', code: 'PNQ' },
	{ name: 'Patna', code: 'PAT' },
	{ name: 'Porbandar', code: 'PBD' },
	{ name: 'Port Blair', code: 'IXZ' },
	{ name: 'Pondicherry', code: 'PNY' },
	{ name: 'Pune', code: 'PNQ' },
	{ name: 'Patna', code: 'PAT' },
	{ name: 'Porbandar', code: 'PBD' },
	{ name: 'Port Blair', code: 'IXZ' },
	{ name: 'Pondicherry', code: 'PNY' },
	{ name: 'Raipur', code: 'RPR' },
	{ name: 'Rajkot', code: 'RAJ' },
	{ name: 'Ranchi', code: 'IXR' },
	{ name: 'Rajkot', code: 'RAJ' },
	{ name: 'Ranchi', code: 'IXR' },
	{ name: 'Srinagar', code: 'SXR' },
	{ name: 'Shillong', code: 'SHL' },
	{ name: 'Shimla', code: 'SLV' },
	{ name: 'Surat', code: 'STV' },
	{ name: 'Srinagar', code: 'SXR' },
	{ name: 'Shillong', code: 'SHL' },
	{ name: 'Shimla', code: 'SLV' },
	{ name: 'Surat', code: 'STV' },
	{ name: 'Tirupati', code: 'TIR' },
	{ name: 'Trivandrum', code: 'TRV' },
	{ name: 'Tirupati', code: 'TIR' },
	{ name: 'Trivandrum', code: 'TRV' },
	{ name: 'Udaipur', code: 'UDR' },
	{ name: 'Udaipur', code: 'UDR' },
	{ name: 'Varanasi', code: 'VNS' },
	{ name: 'Vishakhapatnam', code: 'VTZ' },
	{ name: 'Vijayawada', code: 'VGA' },
	{ name: 'Varanasi', code: 'VNS' },
	{ name: 'Vishakhapatnam', code: 'VTZ' },
	{ name: 'Vijayawada', code: 'VGA' },
	{ name: 'Warangal', code: 'WGC' },
	{ name: 'Warangal', code: 'WGC' },
	{ name: 'Yavatmal', code: 'YTL' },
	{ name: 'Yavatmal', code: 'YTL' }
];

export const CITIES_WITH_NAMES = citiesWithNames.airports.map((city, i) => ({
	city: city.city_name,
	iataCode: city.IATA_code,
	name: city.airport_name,
	id: 'ID' + i,
	createdAt: new Date().toISOString()
}));

export const TRAVEL_CLASS_OPTIONS: string[] = ['Economy', 'Premium Economy', 'Business', 'First'];

export const travellersOptions = [
	{
		value: 1,
		label: '1'
	},
	{
		value: 2,
		label: '2'
	},
	{
		value: 3,
		label: '3'
	},
	{
		value: 4,
		label: '4'
	},
	{
		value: 5,
		label: '5'
	},
	{
		value: 6,
		label: '6'
	},
	{
		value: 7,
		label: '7'
	}
];
