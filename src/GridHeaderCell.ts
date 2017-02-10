import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemeableMixin, ThemeableProperties, theme } from '@dojo/widget-core/mixins/Themeable';
import { v } from '@dojo/widget-core/d';
import { Column, SortDetails } from './LeGrid';

import * as css from './styles/gridHeaderCell.css';

export interface GridHeaderProperties extends ThemeableProperties, WidgetProperties {
	onSortRequest(columnId: string, descending: boolean): void;
	sortDetails?: SortDetails;
	column: Column;
	id: string;
}

@theme(css)
export default class GridHeaderCell extends ThemeableMixin(WidgetBase)<GridHeaderProperties> {
	onSortRequest(event: MouseEvent): void {
		const { id, sortDetails: { descending = false } = {} } = this.properties;
		this.properties.onSortRequest && this.properties.onSortRequest(id, !descending);
	}

	render() {
		const { id, column, sortDetails: { descending = false, columnId = '' } = { } } = this.properties;
		const classes = [css.sortArrow, css.icon];
		const onclick = column.sortable ? { onclick: this.onSortRequest } : {};
		const sorted = columnId === id ? true : false;
		let sortArrow = null;

		if (sorted) {
			descending && classes.push(css.sortUp);
			sortArrow = v('div', { classes: this.classes(...classes).get(), role: 'presentation' });
		}

		return v('th', { ...onclick, ...{ classes: this.classes(css.cell).get(), role: 'columnheader' } }, [
			v('span', [ column.label ]),
			sortArrow
		]);
	}
}