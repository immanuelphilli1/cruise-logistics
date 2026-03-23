import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pencil, Trash2, Plus, AlertTriangle } from 'lucide-react';

export interface Column<T> {
  id: keyof T | string;
  label: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
}

interface ManagementTableProps<T extends object> {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  getStatus?: (row: T) => 'active' | 'paused' | 'inactive';
  isAdmin: boolean;
  canRaiseFault?: boolean;
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onRaiseFault?: (row: T) => void;
  renderDetail: (row: T, onClose: () => void) => React.ReactNode;
  className?: string;
}

const statusGradient = {
  active: 'from-green-500/10 to-transparent',
  paused: 'from-yellow-500/10 to-transparent',
  inactive: 'from-red-500/10 to-transparent',
};

export function ManagementTable<T extends object>({
  title,
  subtitle,
  columns,
  rows,
  getRowKey,
  getStatus,
  isAdmin,
  canRaiseFault,
  onAdd,
  onEdit,
  onDelete,
  onRaiseFault,
  renderDetail,
  className = '',
}: ManagementTableProps<T>) {
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const showActions = isAdmin || canRaiseFault;
  const gridCols = showActions
    ? `${columns.map(() => 'minmax(0, 1fr)').join(' ')} auto`
    : columns.map(() => 'minmax(0, 1fr)').join(' ');

  return (
    <div className={`w-full max-w-6xl mx-auto p-4 sm:p-6 overflow-x-auto ${className}`}>
      <div className="relative border border-neutral-200 rounded-2xl p-4 sm:p-6 bg-white shadow-sm min-w-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h2 className="text-xl font-semibold text-primary-black">{title}</h2>
            </div>
            {subtitle && (
              <span className="text-sm text-neutral-500">{subtitle}</span>
            )}
          </div>
          {isAdmin && onAdd && (
            <button
              type="button"
              onClick={onAdd}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bronze-gold/10 border border-bronze-gold/30 text-bronze-gold text-sm font-medium hover:bg-bronze-gold/20 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          )}
        </div>

        <div className="space-y-2">
          <div
            className="grid gap-4 px-4 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wider border-b border-neutral-100"
            style={{ gridTemplateColumns: gridCols }}
          >
            {columns.map((col) => (
              <div key={String(col.id)} className={col.className}>
                {col.label}
              </div>
            ))}
            {showActions && (
              <div className="text-right">Actions</div>
            )}
          </div>

          {rows.map((row, index) => {
            const status = getStatus?.(row) ?? 'active';
            const key = getRowKey(row);
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="relative cursor-pointer"
                onClick={() => setSelectedRow(row)}
              >
                <motion.div
                  className="relative bg-neutral-50 border border-neutral-200 rounded-xl p-4 overflow-hidden hover:border-neutral-300 transition-colors"
                  whileHover={{ y: -1 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-l ${statusGradient[status]} pointer-events-none`}
                    style={{
                      backgroundSize: '30% 100%',
                      backgroundPosition: 'right',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <div
                    className="relative grid gap-4 items-center"
                    style={{ gridTemplateColumns: gridCols }}
                  >
                    {columns.map((col) => (
                      <div key={String(col.id)} className={col.className ?? 'min-w-0'}>
                        {col.render
                          ? col.render(row)
                          : (row as Record<string, unknown>)[col.id as string] as React.ReactNode ?? '—'}
                      </div>
                    ))}
                    {showActions && (
                    <div className="flex items-center justify-end gap-1">
                      {isAdmin && (
                        <>
                          {onEdit && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEdit(row);
                              }}
                              className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-200 hover:text-primary-black"
                              aria-label="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDelete(row);
                              }}
                              className="p-1.5 rounded-lg text-neutral-500 hover:bg-red-100 hover:text-red-600"
                              aria-label="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </>
                      )}
                      {canRaiseFault && onRaiseFault && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRaiseFault(row);
                          }}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg text-amber-700 bg-amber-100 border border-amber-300/50 text-xs font-medium hover:bg-amber-200"
                        >
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Raise fault
                        </button>
                      )}
                    </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {selectedRow && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col rounded-2xl z-10 overflow-hidden border border-neutral-200"
            >
              <div className="flex items-center justify-end gap-2 p-4 border-b border-neutral-200">
                {isAdmin && onEdit && (
                  <button
                    type="button"
                    onClick={() => onEdit(selectedRow)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bronze-gold/10 border border-bronze-gold/30 text-bronze-gold text-sm font-medium"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                )}
                {isAdmin && onDelete && (
                  <button
                    type="button"
                    onClick={() => {
                      onDelete(selectedRow);
                      setSelectedRow(null);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-medium"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                )}
                {canRaiseFault && onRaiseFault && (
                  <button
                    type="button"
                    onClick={() => onRaiseFault(selectedRow)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-800 text-sm font-medium"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Raise fault
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedRow(null)}
                  className="p-2 rounded-lg border border-neutral-200 hover:bg-neutral-100"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {renderDetail(selectedRow, () => setSelectedRow(null))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
