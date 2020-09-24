<?php

namespace App\Repositories;

use App\Models\Report;

class ReportRepository
{
    /**
     * @var Report
     */
    protected $Report;

    /**
     * ReportRepository constructor.
     *
     * @param Report $report
     */
    public function __construct(Report $report)
    {
        $this->report = $report;
    }

    /**
     * Get all reports.
     *
     * @return Report $report
     */
    public function getAll()
    {
        return $this->report
            ->get();
    }

    /**
     * Get report by id
     *
     * @param $id
     * @return mixed
     */
    public function getById($id)
    {
        return $this->report
            ->where('id', $id)
            ->get();
    }

    /**
     * Save Report
     *
     * @param $data
     * @return Report
     */
    public function save($data)
    {
        $report = new $this->report;

        $report->title = $data['title'];

        $report->save();

        return $report->fresh();
    }

    /**
     * Update Report
     *
     * @param $data
     * @return Report
     */
    public function update($data, $id)
    {

        $report = $this->report->find($id);

        $report->title = $data['title'];

        $report->update();

        return $report;
    }

    /**
     * Delete Report
     *
     * @param $data
     * @return Report
     */
    public function delete($id)
    {

        $report = $this->report->find($id);
        $report->delete();

        return $report;
    }

}