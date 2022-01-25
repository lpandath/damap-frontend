import {repositoryReducer} from './repository.reducer';
import {initialRepositoryState} from '../states/repository.state';
import {
  FailedToLoadRepositories,
  LoadRepositories,
  RepositoriesLoaded,
  ResetRepositoryFilter,
  SetRepositoryFilter,
  UpdateRepository
} from '../actions/repository.actions';
import {LoadingState} from '../../domain/enum/loading-state.enum';
import {mockDetailRepo, mockRepo} from '../../mocks/repository-mocks';

describe('RepositoryReducer', () => {
  it('should return failed loading state', () => {
    const state = repositoryReducer(initialRepositoryState, new FailedToLoadRepositories());

    expect(state.loaded).toBe(LoadingState.FAILED);
    expect(state.ids).toEqual(initialRepositoryState.ids);
    expect(state.entities).toEqual(initialRepositoryState.entities);
    expect(state.filters).toEqual(initialRepositoryState.filters);
  });

  it('should return loading state', () => {
    const state = repositoryReducer(initialRepositoryState, new LoadRepositories());

    expect(state.loaded).toBe(LoadingState.LOADING);
    expect(state.ids).toEqual(initialRepositoryState.ids);
    expect(state.entities).toEqual(initialRepositoryState.entities);
    expect(state.filters).toEqual(initialRepositoryState.filters);
  });

  it('should return loaded and updated repositories', () => {
    const state = repositoryReducer(initialRepositoryState, new RepositoriesLoaded({repositories: [mockRepo]}));

    expect(state.loaded).toBe(LoadingState.LOADED);
    expect(state.ids).toEqual(['r3d100013557']);
    expect(state.entities).toEqual({r3d100013557: mockRepo});
    expect(state.filters).toEqual(initialRepositoryState.filters);

    const newState = repositoryReducer(state, new UpdateRepository(
      {update: {id: mockRepo.id, changes: {info: mockDetailRepo.info}}}
    ));

    expect(newState.loaded).toBe(LoadingState.LOADED);
    expect(newState.ids).toEqual(['r3d100013557']);
    expect(newState.entities).toEqual({r3d100013557: mockDetailRepo});
    expect(newState.filters).toEqual(state.filters);
  });

  it('should return set and reset repository filters', () => {
    const state = repositoryReducer(initialRepositoryState,
      new SetRepositoryFilter({filter: {name: 'id', value: ['orcid']}})
    );

    expect(state.loaded).toBe(LoadingState.LOADING);
    expect(state.ids).toEqual(initialRepositoryState.ids);
    expect(state.entities).toEqual(initialRepositoryState.entities);
    expect(state.filters).toEqual({id: ['orcid']});

    const newState = repositoryReducer(state, new ResetRepositoryFilter());

    expect(newState.ids).toEqual(state.ids);
    expect(newState.entities).toEqual(state.entities);
    expect(newState.filters).toEqual({});
  });
})