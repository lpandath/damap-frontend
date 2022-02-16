import {createAction, props} from '@ngrx/store';
import {Repository} from '../../domain/repository';
import {Update} from '@ngrx/entity';

export const loadAllRepositories = createAction('[Repositories] Load all');

export const repositoriesLoaded = createAction('[Repositories] All loaded', props<{ repositories: Repository[] }>());

export const loadRepository = createAction('[Repositories] Load one', props<{ id: string }>());

export const updateRepository = createAction('[Repositories] Update one', props<{ update: Update<Repository> }>());

export const failedToLoadRepositories = createAction('[Repositories] Failed to load all');

export const setRepositoryFilter = createAction('[Repositories] Set filter', props<{ filter: { name: string, value: string [] } }>());
