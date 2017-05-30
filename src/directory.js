import angular from 'angular';

import { ContactsConstant } from './components/contacts.constant';
import { DirectoryService } from './components/users.service';
import { SearchComponent } from './components/search.component';
import { StartFromFilter } from './components/start-from.filter';
import { PhoneFilter } from './components/phone.filter';
import { TemplateRun } from './components/templates.run'

angular.module('uoitDirectory', [])
	.constant('Contacts', ContactsConstant)
	.service('DirectoryService', DirectoryService)
	.component('directorySearch', SearchComponent)
	.filter('startFrom', StartFromFilter)
	.filter('tel', PhoneFilter)
	.run(TemplateRun);

angular.bootstrap(document.body, ['uoitDirectory'], {
	strictDi: true
});