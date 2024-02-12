var hobbies = [];
var cities = [];
const showableItems = {};
      showableItems.hobbies = [];
      showableItems.cities = [];


main().then(() => console.log('done'))



async function main() {
    const members = await getMembers();
    const membersWithData = await getMemberDetails(members);
	renderMembers(membersWithData);
	addEventHandlers();
}


async function getMemberDetails(members) {
    const promises = members.map(async member => {
        let memberDataUrl = member.personalPage + '/personal.json';
        member.memberData = await getMemberInfo(memberDataUrl);
    });

    await Promise.all(promises);

    // Now all member data has been fetched
	return members;

}


async function renderMembers(members) {
    const container = document.querySelector('[data-members]');
    const list = document.createElement('ul')
			
    members.map(member => {

		const memberData = member.memberData;
        const item = document.createElement('li');
        const anchor = document.createElement('a');
        const description = document.createElement('p');
        const avatar = document.createElement('img');
		
		memberData.hobbies.map( hobby => {
			let hobbyText = hobby.replace(/\s+/g, '-').toLowerCase();
			// put every hobby in the global hobbies array
			hobbies.push( hobbyText );
			// and to the classList of the item
			item.classList.add( hobbyText );
		})
		// do the same for the city
		cities.push( memberData.city.toLowerCase() );
		item.classList.add( memberData.city.replace(/\s+/g, '-').toLowerCase() );

        // anchor.href = `https://${student.login}.github.io/web-app-from-scratch-2324/`;
        anchor.alt = `WAFS fork from ${memberData.firstName}`;
        anchor.target = '_blank';
        anchor.textContent = memberData.firstName + ' ' + memberData.lastName;
        avatar.src = memberData.avatar_url;
        item.append(avatar)
        item.append(anchor)
        list.append(item)
    })
	
    container.append(list);
	hobbies = await removeDuplicates( hobbies );
	populateFilterSelect( hobbies, '#filter-hobbies');

	cities = await removeDuplicates( cities );
	populateFilterSelect( cities, '#filter-cities');

}

async function getMembers() {
    const res = await fetch('./team.json')
    const team = await res.json()
    return team.members;
}
async function getMemberInfo(memberDataUrl) {
    const res = await fetch(memberDataUrl)
    const member = await res.json()
    return member;
}


async function populateFilterSelect(data, listID) {
	const filterEl = document.querySelector(listID);
	data.map(value => {
		const option = document.createElement('option');
		option.value = value;
		option.text = value;
		filterEl.append(option)
	});
}
async function populateFilterDatalist(data, listID) {
	const filterEl = document.querySelector(listID);
	data.map(value => {
		const option = document.createElement('option');
		option.value = value;
		option.text = value;
		filterEl.append(option)
	});
}




/*
 * Show items based on the filter values of showableItems
 *
 */
function showItems() {
	const items = document.querySelectorAll('[data-members] >ul > li');
	const filterKeys = Object.keys(showableItems);
	
	items.forEach((item) => {
		item.classList.add('hidden'); // initially, hide all

		// loop through all filters
		filterKeys.forEach((filter) => {
			if( showableItems[filter].length > 0 ) {
				showableItems[filter].forEach((value) => {
					// if a fliter value is set on the item (as class), unhide
					if( item.classList.contains( value ) ) {
						item.classList.remove('hidden');
					}
				});
			}
		});
	});
}



// Add eventListeners for each filter
function addEventHandlers() {
	const filters = document.querySelectorAll('select[name^="filter"]');
	let itemsProcessed = 0;
	filters.forEach((filter, index, array) => {
		filter.addEventListener('change', function() { // on input
			let filterValue = this.options[this.selectedIndex].value;

			let filterType = this.getAttribute('data-filter');	
			// clean up showable item for this filter type
			showableItems[filterType] = [filterValue];
			showItems();
		});
	});
}




async function removeDuplicates( array ) {
  return new Promise((resolve) => {
	  let newArray = [...new Set( array )];
      resolve(newArray);

  });
}
