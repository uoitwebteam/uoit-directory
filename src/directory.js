import { SearchComponent } from './components/search.component';
import { StartFromFilter } from './components/start-from.filter';
import { UsersService } from './components/users.service';
import { TemplateRun } from './components/templates.run'

angular.module('uoitDirectory', [])
	.component('directorySearch', SearchComponent)
	.component('startFrom', StartFromFilter)
	.service('usersService', UsersService)
	.run(TemplateRun);

angular.bootstrap(document.body, ['uoitDirectory'], {
	strictDi: true
});