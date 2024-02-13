import { ReceiptType, ReceiptOptions, ReceiptData, ReceiptI18n, ReceiptDataAddress, ReceiptDataItem, ReceiptCopyContext } from './types';
import { LitElement } from 'lit';
import 'moment-timezone/moment-timezone-utils';
/**
 * Generates receipt from cart, order or preview.
 */
export declare class AppReceipt extends LitElement {
    type: ReceiptType;
    data: ReceiptData;
    options: ReceiptOptions;
    i18n: ReceiptI18n;
    constructor();
    getI18n(id: number): string;
    getReceiptOption<K extends keyof ReceiptOptions>(key: K): ReceiptOptions[K];
    getReceiptData<K extends keyof ReceiptData>(key: K): ReceiptData[K];
    styleAlign(align?: 'left' | 'right' | 'center'): import("lit-html/directive").DirectiveResult<typeof import("lit-html/directives/style-map").StyleMapDirective>;
    formatAddress(address: Partial<ReceiptDataAddress>): string;
    formatDate(date: string): string;
    showItemDiscount(item: ReceiptDataItem): boolean;
    showItemOriginalPrice(item: ReceiptDataItem): boolean;
    hideOnAdditionalPrints(field: string, ctx: ReceiptCopyContext): boolean;
    showProductSku(item: ReceiptDataItem, ctx: ReceiptCopyContext): boolean;
    showProductName(ctx: ReceiptCopyContext): boolean;
    showProductCost(ctx: ReceiptCopyContext): boolean;
    showProductQuantity(ctx: ReceiptCopyContext): boolean;
    showProductAttributes(ctx: ReceiptCopyContext): boolean;
    showOrderNumber(ctx: ReceiptCopyContext): boolean;
    showClerk(ctx: ReceiptCopyContext): boolean;
    showCustomer(ctx: ReceiptCopyContext): string | false;
    toNumber(value: number | string): number;
    formatMoney(value: number | string | undefined): string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'app-receipt': AppReceipt;
    }
}
